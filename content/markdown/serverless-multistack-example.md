---
title: Serverless Multistack Example
date: '2020-09-29'
contributors: Simon Karman and Benthe Hagemeijer
description: An example project for splitting an AWS project, build using the Serverless Framework, into multiple CloudFormation stacks to avoid the 200 resources limit that AWS imposes on CloudFormation stacks.
tags:
  - aws
  - cloudformation
  - serverless
image: https://images.ctfassets.net/r26fkm24j6bh/7lYVILwNc3hTsiNQax7l4R/5ea2ee39b433c2b31ad2e56740b00070/serverless.png
repository: https://github.com/simonkarman/serverless-multistack-example
---

# Serverless Multistack Example
This project shows an example of splitting an AWS project, build using the [Serverless Framework](https://www.serverless.com), into multiple CloudFormation stacks to avoid the 200 resources limit that AWS imposes on CloudFormation stacks.

The following requirements were taking into account when choosing for this solution:
- The ability to define lambda functions using the Serverless Framework in all the sub stacks.
- The ability to have all http triggered functions live under a single rest api.
- The ability to easily split up the project into additional sub stacks as the project grows over time.
- The ability to leave the important resources that are currently still in the root stack such as dynamodb tables and s3 buckets in place.

To achieve the above results the project is split up into multiple smaller serverless stacks. There is one root stack and multiple sub stacks. The root stacks should define cloud formation resources that are used by more than one sub stack, for example a dynamodb table containing information that all sub stacks need to access. The sub stacks can use resources from the root stack by using outputs and imports. 

One of the most important resources defined in the root stack is the api gateway. This api gateway should by all sub stacks to deploy their resources. To achieve this the [serverless-import-apigateway](https://www.serverless.com/plugins/serverless-import-apigateway) plugin is used.

## Getting Started
To deploy these stacks to your AWS account run the following commands:
```bash
# setup aws credentials on your local machine
aws configure

# install dependencies
npm install

# deploy the root stack and sub stack to aws
npm run deploy
```

## Related Work
While trying to achieve the splitting of a stack into multiple stacks, we also considered using some plugins. Even though we eventually decided not to use them, they might be interesting for your use case:

- *[serverless-plugin-split-stacks](https://www.npmjs.com/package/serverless-plugin-split-stacks)*: This plugin can split your serverless stack into multiple stacks. It can do this based on the resource type of your resources, the function groups as defined in your serverless yml, or using a custom grouping function.
- *[serverless-plugin-additional-stacks](https://www.npmjs.com/package/serverless-plugin-additional-stacks) and [serverless-plugin-nested-stacks](https://www.serverless.com/plugins/serverless-plugin-nested-stacks)*: These plugins provide a way to specify separate cloud formation files in your root stack (either in the root stack itself, or in separate files). The plugin will these nested stacks to your serverless s3 bucket before deployment and then references them as nested stack resources in the resulting cloud formation template of the root stack. The benefit of using this plugin is that you only need one deploy command. The downside is that this doesn't give you the ability to define your lambda functions using the serverless framework, since the nested stacks you provide are plain cloud formation.

## Contributors
- *Initial Work* - [Simon Karman](https://www.simonkarman.nl) and Benthe Hagemeijer