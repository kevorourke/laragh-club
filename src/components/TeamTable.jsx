import Link from "next/link";

export default function TeamsStackedTable({ teams }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Teams
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All the teams in the club, click view to see players on the team
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Code
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Year
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {teams.map((team) => (
              <tr key={team.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {team.team_name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Code</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {team.code.toUpperCase()}
                    </dd>
                    <dt className="sr-only sm:hidden">Year</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {team.year === null
                        ? "Senior"
                        : JSON.stringify(team.year)}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {team.code.toUpperCase()}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.year === null ? "Senior" : JSON.stringify(team.year)}
                </td>

                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a
                    href={`/members/team-manager/${team.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View team members
                    <span className="sr-only">, {team.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
