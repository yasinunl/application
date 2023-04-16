const FilterList = ()=> {
    return (
        <div id="usersInfo">
        <form className="mt-4 border-gray-200 w-72">
            <div className=" border-gray-200 px-4 py-6">
                  <h2 className=" text-sh-phlox font-bold ">Color</h2>
              <div className="pt-6" id="filter-section-mobile-0">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input id="filter-mobile-color-0" name="color[]" defaultValue="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-sh-phlox">White</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-color-1" name="color[]" defaultValue="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-sh-phlox">Beige</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-color-2" name="color[]" defaultValue="blue" type="checkbox"  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-sh-phlox">Blue</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-color-3" name="color[]" defaultValue="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-sh-phlox">Brown</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-color-4" name="color[]" defaultValue="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-sh-phlox">Green</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-color-5" name="color[]" defaultValue="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-sh-phlox">Purple</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
                <h2 className="text-sh-phlox font-bold">Price Range</h2>
              <div className="pt-6" id="filter-section-mobile-1">
                <div className="space-y-6">
                  <div>
                    <div className="">
                        <div className="flex flex-row justify-between">
                      <div className="">
                        <input id="min-price" type="range" min="0" max="7000" defaultValue="3500" step="1" className="" style={{width: "115px"}} />
                      </div>
                      <div className="">
                        <input id="min-price" type="range" min="0" max="7000" defaultValue="3500" step="1" className="" style={{width: "115px"}} />
                      </div>
              </div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                          <label htmlFor="min-price-input" className="">From</label>
                          <input type="number" style={{width: "115px"}} id="min-price-input" defaultValue="300" min="0" max="7000" className="bg-sh-dark-blue/50 border border-sh-green text-sh-light-blue sm:text-sm rounded-lg block w-full p-1 pl-2 left-0" placeholder="" />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="max-price-input" className="">To</label>
                          <input type="number" style={{width: "115px"}} id="max-price-input" defaultValue="3500" min="0" max="7000" className="bg-sh-dark-blue/50 border border-sh-green text-sh-light-blue sm:text-sm rounded-lg block w-full p-1 pl-2 right-0" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
                <h2 className="text-sh-phlox font-bold">Color</h2>
              <div className="pt-6" id="filter-section-mobile-2">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input id="filter-mobile-size-0" name="size[]" defaultValue="2l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-0" className="ml-3 min-w-0 flex-1 text-sh-phlox">2L</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-size-1" name="size[]" defaultValue="6l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-1" className="ml-3 min-w-0 flex-1 text-sh-phlox">6L</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-size-2" name="size[]" defaultValue="12l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-2" className="ml-3 min-w-0 flex-1 text-sh-phlox">12L</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-size-3" name="size[]" defaultValue="18l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-3" className="ml-3 min-w-0 flex-1 text-sh-phlox">18L</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-size-4" name="size[]" defaultValue="20l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-4" className="ml-3 min-w-0 flex-1 text-sh-phlox">20L</label>
                  </div>

                  <div className="flex items-center">
                    <input id="filter-mobile-size-5" name="size[]" defaultValue="40l" type="checkbox"  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="filter-mobile-size-5" className="ml-3 min-w-0 flex-1 text-sh-phlox">40L</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
      </div>
    )
}
export default FilterList