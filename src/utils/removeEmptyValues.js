export function removeEmptyValues(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = object[key];
      if (value === null || value === undefined || value === '') {
        delete object[key];
      }
    }
  }
  return object;
}

export function dateFormat(dateString) {
  return new Date(dateString).toLocaleString('en-in', {
    timeZone: 'Asia/Kolkata',
  });
}

export function generateUniqueId() {
  // Get current timestamp
  const timestamp = new Date().getTime();

  // Generate a random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  // Combine timestamp and random number to create the unique ID
  const uniqueId = timestamp.toString().substring(6) + randomNumber.toString();

  // Set the unique ID in the state or use it as needed
  return uniqueId;
}
