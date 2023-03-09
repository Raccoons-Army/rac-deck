import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { Table, FormGroup, Input } from 'reactstrap';

export default function HotkeysTable({ dataType }) {

    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([])

    // load table content
    useEffect(() => {
        console.log("Table content: " + dataType);
        if (dataType == "Nick") {
            //TODO
            setColumns(["Change on all servers", "Nick"])
        } else {
            //TODO
            setColumns(["Channel", "Name"])
        }

    }, [dataType])

    // handle to delete hotkey
    const handleDelete = (id) => {

    }

    return (
        <>
            <Table
                bordered
                responsive
                size=""
                striped
            >
                <thead>
                    <tr>

                        {columns?.map((c) => {
                            return (
                                <th key={c}>
                                    {c}
                                </th>

                            )
                        })}
                        <th >
                            Hotkey
                        </th>
                        <th>
                            On/Off
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >
                            {dataType == "Nick" ? <FormGroup switch>
                                <Input id="changeOnStart"
                                    name="changeOnStart"
                                    type="switch"
                                />
                            </FormGroup> : "someshit"}
                        </td>
                        <td>
                            Otto
                        </td>
                        <td>
                            @mdo
                        </td>
                        <td>
                            <FormGroup switch>
                                <Input id="changeOnStart"
                                    name="changeOnStart"
                                    type="switch"
                                />
                            </FormGroup>
                        </td>
                        <td onClick={() => handleDelete(2)}>
                            <FontAwesomeIcon color='red' icon={faTrash} className="mr-2" />
                        </td>
                    </tr>

                </tbody>
            </Table>
        </>
    )
}