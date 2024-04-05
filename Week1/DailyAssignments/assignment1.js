const apiUrl = "https://jsonplaceholder.typicode.com/users";

const getData = () => {
  return fetch(apiUrl).then((response) => {
    return response.json();
  });
};

const fetchData = async () => {
  const result = await getData();
  console.log(result);
};
fetchData();
