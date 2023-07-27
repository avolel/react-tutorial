function PlateData({entries}){
    return (
        <div>
            {entries.map((p, index) => ( <p>{p.plate}</p>))}
        </div>
    );
}

export default PlateData;