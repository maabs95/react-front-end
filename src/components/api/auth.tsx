export const validation = async () => {
    const response = await fetch("http://localhost:8080/v1/loggedInUser",{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("auth")
        }
    });
    return response.status;
}