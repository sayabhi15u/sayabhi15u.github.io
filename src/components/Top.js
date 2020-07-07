import React from 'react';

const top = ()=>{
    const styles={
        bgstyle: {backgroundColor: "orange", borderRadius: "0px 0px 10px 10px",},
        title: {fontSize: "0.8rem",color:"white",paddingLeft: "8px",paddingRight: "8px",paddingBottom: "8px"},
    }
    return <div style={styles.bgstyle}>
        <h1 style={styles.title}>Recivables Dashboard</h1>
    </div>
}

export default top;