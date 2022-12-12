import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';

let idkwatdistingdo: FC<{ data: {name: string}[] }> = ({ data }) => (
    <ul>
        {data.map(({name}) => <li key={uuidv4()}> {name} </li>)}
    </ul>
)

export default idkwatdistingdo