//api
export function getEvents(category) {
  return fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error retrieving events');
      }
      return response.json();
    });
}
