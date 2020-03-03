import React from "react";
import { Table, TableCell, TableRow, TableHead } from 'react-toolbox/lib/table'


export class Result extends React.Component{
    render() {
        const {table} = this.props;
        return(
            <div id={"result"}>
                <Table selectable={false} >
                    <TableHead>
                        <TableCell >
                            X
                        </TableCell>
                        <TableCell >
                            Y
                        </TableCell>
                        <TableCell >
                            R
                        </TableCell>
                        <TableCell>
                            HIT
                        </TableCell>
                    </TableHead>
                    {table.map((dot) => (
                        <TableRow>
                            <TableCell >
                                {dot.x}
                            </TableCell>
                            <TableCell >
                                {dot.y}
                            </TableCell>
                            <TableCell >
                                {dot.r}
                            </TableCell>
                            <TableCell >
                                {String(dot.inArea)}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        )
    }
}