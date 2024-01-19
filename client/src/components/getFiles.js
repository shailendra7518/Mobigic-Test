

const getFiles = async() => {
    try {
        const res = await fetch('')
        const files = await res.json();
        return files;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}
 export default getFiles