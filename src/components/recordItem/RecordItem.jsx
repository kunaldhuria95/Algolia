import { BiSolidUpArrow } from "react-icons/bi";


const RecordItem = ({ record }) => {
    return (
        <div style={{ marginLeft: "20px", border: "1px solid #ddd", padding: "10px" }}>
            <p><strong>Author:</strong> {record.author}</p>
            <p><strong>Created At:</strong> {new Date(record.created_at).toLocaleString()}</p>
            {record.text && <p><strong>Text:</strong> {record.text}</p>}
            <p><strong>Points:</strong> {record.points}</p>

            {/* Render children recursively */}
            {record.children && record.children.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    <h4><BiSolidUpArrow size={10}/></h4>
                    {record.children.map((child) => (
                        <RecordItem key={child.id} record={child} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default RecordItem;
