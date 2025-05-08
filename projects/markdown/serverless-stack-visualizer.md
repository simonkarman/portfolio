---
title: Serverless Stack Visualizer
date: '2020-01-29'
contributors: Simon Karman
description: A tool to visualize serverless resources in Cloud Formation stack across multiple AWS accounts
tags:
  - serverless
  - aws
  - cloudformation
image: https://images.ctfassets.net/r26fkm24j6bh/3KDafadG40WXxJurpCiOmJ/3d6bdb2dd8289cdd5faf11760e0db64d/serverless-stack-visualiser__1_.png
---

# Serverless Stack Visualizer
The serverless stack visualizer is a tool to visualize serverless resources in Cloud Formation stack across multiple AWS accounts.

If you've ever build an application on a large scale you have probably deployed it to multiple different environments. First you deploy it to a development environment, then once you're satisfied with its performance or new features you will continue to the test environment, after that you'll sometimes even deploy it to acceptance and or a sandbox environment, and the final goal is ofcourse to deploy your application to the production environment.

When working with AWS this probably means that you'll have separate CloudFormation stack that you'll use to deploy your application for each of those environments. You would probably want to have different setup of users and policies on your AWS account for the develop environment versus your AWS account for the production environment. In some cases this boundary can even result in the two environments living in two entirly different AWS accounts.

So now we have one application that exists in multiple CloudFormation stacks in multiple AWS accounts and a different version of the application might have been deployed to each. Keeping track of which function is deployed where, or quickly navigating through the AWS console while switching accounts can both be challenging tasks.

To overcome these challenges I build an serverless-stack-visualizer which can visualize the current state of your serverless AWS resources (such as Lambda functions, DynamoDB tables, and S3 buckets) across different CloudFormation stacks and even across different AWS accounts.

![Serverless Stack Visualizer Architecture](//images.ctfassets.net/r26fkm24j6bh/3KDafadG40WXxJurpCiOmJ/3d6bdb2dd8289cdd5faf11760e0db64d/serverless-stack-visualiser__1_.png)

## Architecture
The tool can be run locally on your computer. To run it you need to run both a server and a client.

The responsibility of the server is to request the status of cloud formation stacks and its underlying resources at the different AWS accounts and save this information to make it available for the viewer to view. This server serves as a cache. Even when switching your credentials to another AWS account, the information about stacks that it gather on the other accounts is kept. For all the information it gathers it stores when it gathered it, to ensure you'll update it once it gets outdated, it stores from which account and from which cloud formation stack it pulled the information so it can be represented in a nice grid to the user.

The responsibility of the client is to show all the relevant information to the user, request data at the server, and link the user to the resources in the AWS console. The current account that the user is signed in to is the account for which the resources will light up. The other resources will dim down and won't be clickable anymore, once a user switches to another account this status changes and the resources and stacks corresponding to that account will light up and become available to click on.

## Implementation Details
The server and viewer are both written in JavaScript. The server build using Express and the client was build using Nuxt (a VueJS framework).

The servers main functionality lies around pull cloud formation stacks from the aws account. In the code snippet below you can see the definition of the `/aws/pull` endpoint. Based on the baseStackName you provide in the body (for example `company-#-application-stack`) it will try to find all stacks on the AWS account you're currently logged into (for example `company-tst-application-stack` and `company-acc-application-stack`).

```javascript
app.post('/aws/pull', (req, res) => {
  const baseStackName = req.body.baseStackName;
  pull(baseStackName)
    .then((response) => res.send({ message: response }))
    .catch((error) => res.send({ message: 'Error while trying to pull', error: error.toString() }))
});
```

This pull functionality is defined in the service layer of the server. It pulls information about the AWS CloudFormation stacks using the AWS SDK for JavaScript. In the code snippet below you can see how it gathers all information of a single stack by the baseStackName (for example `company-#-application-stack`) and the current stageName (for example `tst` or `acc`).

It first fetches information about the stack, then gathers all resources of that stack, then filters these resources into smaller groups containing only the relevant data, and finally returns all that relevant information including metadata to the caller.

```javascript
const gatherStack =  async (metadata, baseStackName, stageName) => {
  const cfn = new AWS.CloudFormation();
  const fullStackName = baseStackName.replace('#', stageName);

  // Stack Instance
  const cfnStackInstance = await cfn.describeStacks({ StackName: fullStackName }).promise();
  const instance = cfnStackInstance.Stacks[0];

  // Stack Resources
  let cfnStackResources = { StackResourceSummaries: [], NextToken: undefined };
  do {
    const responseCfnStackResources = await cfn.listStackResources({ StackName: fullStackName, NextToken: cfnStackResources.NextToken }).promise()
    cfnStackResources.StackResourceSummaries.push(...responseCfnStackResources.StackResourceSummaries);
    cfnStackResources.NextToken = responseCfnStackResources.NextToken;
  } while (cfnStackResources.NextToken)
  const resources = cfnStackResources.StackResourceSummaries;

  // Groups
  const groups = await resourcesToGroups(fullStackName, resources);

  // Create Stage
  return {
    metadata,
    stageName,
    fullStackName,
    instance,
    groups,
    resources,
  };
}
```

## Conclusion
The tool gives a really nice overview of the current state of the Cloud Formation stack and its resources across multiple AWS accounts. Because of the clear visualization of which data was pulled from which account and at what point in time, it is always clear what the relevant information is.

The fact that you're able to click on the resources such as dynamodb tables to directly see all the items that are in it, to to directly jump to the logs of a certain lambda on a application of a certain environment can be very helpfull.

I hope to have inspired some of you to build a similair tool in your own work environment, and don't hesitate to contact me using the contact form if you would like to discuss how to build this yourself. 
