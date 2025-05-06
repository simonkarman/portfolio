type SearchProps = {
  simpleView: boolean,
  setSimpleView: (value: boolean) => void,
  searchFilter: string,
  setSearchFilter: (value: string) => void,
}

export const SearchBar = (props: SearchProps) => {
  const { simpleView, setSimpleView, searchFilter, setSearchFilter } = props;
  return <div className="w-full my-2 p-5">
    <div className="flex mb-4 justify-between items-end border-b">
      <h1 className="font-bold text-3xl">
        Portfolio
      </h1>
      <button onClick={() => setSimpleView(!simpleView)} className="text-sm text-gray-600">
        Switch to {!simpleView ? 'Simple' : 'Raster'} View
      </button>
    </div>
    <p className="pb-2">
      This page gives an overview of all the work in my portfolio.
      You can search for specific projects using the search bar below.
      You can search based on name or the tags of the project.
    </p>
    <p>
      For example the search term &#39;tag:unity&#39; shows you all projects that were build with the Unity3D engine.
    </p>
    <div className="flex my-2 w-full">
      <input
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Advanced search (for example: 'infinite' or 'tag:unity')"
        type="text"
        className="flex-1 py-1 px-3 border rounded-l"
      />
      <button
        onClick={() => setSearchFilter('')}
        className="py-1 px-3 bg-gray-300 hover:bg-gray-200 rounded-r"
      >
        Clear
      </button>
    </div>
  </div>;
};
