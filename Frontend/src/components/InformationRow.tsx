interface Props {
    keyString: string;
    value: string;
}
const InformationRow = ({ keyString, value }: Props) => {
    return (
        <div className="flex justify-around">
            <span className="font-semibold text-slate-600">{keyString}</span>
            <span className="text-slate-900">{value}</span>
        </div>
    );
}

export default InformationRow;