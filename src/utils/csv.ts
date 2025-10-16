
export const json2csv= (data : Array<any>)=>{

    if(data===undefined || data.length===0) return "No submissions yet";

    const headers= Object.keys(data[0]).map((key:string)=>key);

    const res=[headers.join(",")];
    
    data.forEach((item)=>{
        
        const values= headers.map(header=>{
            const val= item[header] ?? "";
            return `"${val.toString().replace(/"/g, '""')}"`;
        })
        res.push(values.join(","));
    })
    return res.join("\n");
}

export const handleCSVDownload= (csv:string, filename: string)=>{

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}