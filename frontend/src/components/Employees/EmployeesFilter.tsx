import { Department } from "../../types";
import { useState } from "react";

// You could add one of the following UI libraries:
// Option 1: Headless UI (works great with Tailwind)
// yarn add @headlessui/react
// import { Listbox } from '@headlessui/react'

// Option 2: React-select (highly customizable dropdown)
// yarn add react-select
// import Select from 'react-select'

// Option 3: Material UI (full featured component library)
// yarn add @mui/material @emotion/react @emotion/styled
// import { TextField, MenuItem, Select } from '@mui/material'

interface EmployeesFilterProps {
  readonly nameFilter: string;
  readonly setNameFilter: (value: string) => void;
  readonly departmentFilter: string;
  readonly setDepartmentFilter: (value: string) => void;
  readonly employedDateFilter: {
    readonly before?: string;
    readonly after?: string;
  };
  readonly setEmployedDateFilter: (
    filter:
      | {
          before?: string;
          after?: string;
        }
      | ((prev: { before?: string; after?: string }) => {
          before?: string;
          after?: string;
        })
  ) => void;
  readonly departments?: Department[];
  readonly onAddNew?: () => void;
}

export function EmployeesFilter({
  nameFilter,
  setNameFilter,
  departmentFilter,
  setDepartmentFilter,
  employedDateFilter,
  setEmployedDateFilter,
  departments = [],
  onAddNew,
}: EmployeesFilterProps) {
  // Using existing state implementation (or library's built-in state management)

  return (
    <>
      <div className="border rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:space-y-0 lg:grid-cols-1 lg:flex lg:gap-4 lg:items-end">
              <div className="lg:flex-1">
                <label htmlFor="employeeNameSearch" className="block text-sm font-medium text-gray-700 mb-1">
                  Search employees
                </label>
                <input
                  id="employeeNameSearch"
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Enter employee name..."
                />
              </div>

              <div className="lg:w-64">
                <label htmlFor="departmentSelect" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="departmentSelect"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:gap-4 lg:col-span-1">
                <div>
                  <label htmlFor="employedAfterDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Employed After
                  </label>
                  <input
                    id="employedAfterDate"
                    type="date"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={employedDateFilter.after ?? ""}
                    onChange={(e) =>
                      setEmployedDateFilter((prev) => ({
                        ...prev,
                        after: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="employedBeforeDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Employed Before
                  </label>
                  <input
                    id="employedBeforeDate"
                    type="date"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={employedDateFilter.before ?? ""}
                    onChange={(e) =>
                      setEmployedDateFilter((prev) => ({
                        ...prev,
                        before: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {onAddNew && (
          <div className="flex items-end xs:justify-center">
            <button
              onClick={onAddNew}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors h-10"
            >
              Add Employee
            </button>
          </div>
        )}
      </div>
    </>
  );
}
