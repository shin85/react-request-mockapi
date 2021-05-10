import * as React from "react";
import PaginationComponent from "./pagination";
import { EmployeeModel } from "../models/employee";

const EmployeesComponent = () => {
  const [employees, setEmployees] = React.useState<PageModel[] | any>(
    undefined
  );

  const fetchEmployees = async (page: number) => {
    const apiUrl = `https://6093bbe7a7e53a0017951709.mockapi.io/Employees?page=${page}&limit=5&sortBy=Name`;
    fetch(apiUrl).then(async (res) => {
      if (res.ok) {
        setEmployees(await res.json());
      }
    });
  };

  React.useEffect(() => {
    // Update the document title using the browser API
    if (!employees) {
      fetchEmployees(1);
    }
  }, [fetchEmployees]);

  return (
    <>
      <div>
        A page which displays this table and has the “+ New” button as well:
      </div>
      <div>
        I am using (https://www.mockapi.io/) and my api enpoint
        https://mockapi.io/clone/608fb0940294cd001765ec9c
      </div>
      <div>
        I have a set of employee which 22 items and implement a pagination for
        every 5 items (per table page).
      </div>

      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
        </tr>
        {employees?.items?.map((employee: EmployeeModel) => (
          <tr key={employee.Id}>
            <td>{employee.Name}</td>
            <td>{employee.Email}</td>
            <td>{employee.Position}</td>
          </tr>
        ))}
      </table>

      <PaginationComponent
        itemsPerPage={5}
        totalItems={22}
        loadPage={fetchEmployees}
      ></PaginationComponent>
    </>
  );
};

export default EmployeesComponent;
