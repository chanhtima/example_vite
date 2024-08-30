
import moment from 'moment';
import { ConvertDateProps } from '../models/misc.model';


export default function ConvertDate({
    date,
    format = 'DD/MM/YYYY',
}: ConvertDateProps) {
    const formattedDate = moment(date).format(format);
    return (
        <>{formattedDate}</>
    );
}