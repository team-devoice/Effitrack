const Tag = ({ key, skill, skillColors }) =>{
    return(
        <>
            <div key={key} className={`inline-block px-2 py-1 bg-[#f3f4f5] dark:bg-[#333] text-xs rounded-lg border whitespace-nowrap overflow-x-hidden`} style={{ borderColor: skillColors[skill] }}>
                {skill}
            </div>
        </>
    )
}

export default Tag;
