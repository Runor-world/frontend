const SERVER = 'prod'
export const baseUrl = SERVER === 'dev'? 'http://localhost:8000': 'https://runor-backend.onrender.com'


 
export const scrollLeft = (containerRef, yOffset, containerID) =>{ 
    if(containerRef.current.scrollLeft <= 0){
        const containerDOM = document.getElementById(containerID)
        const firstChild = containerDOM.childNodes[0]
        containerDOM.childNodes[0].remove()
        containerDOM.append(firstChild)
    }
    containerRef.current.scrollLeft -= yOffset    
}

export const scrollRight = (containerRef, xOffSet, containerID) =>{
    if(containerRef.current.scrollLeft >= 1408){
        const containerDOM = document.getElementById(containerID)
        const numberOfNodes = containerDOM.childNodes.length
        const lastChild = containerDOM.childNodes[numberOfNodes - 1]
        containerDOM.childNodes[numberOfNodes - 1].remove()
        containerDOM.prepend(lastChild)
    }
    containerRef.current.scrollLeft += xOffSet
}