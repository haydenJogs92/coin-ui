

// converts an object into a set of query string parameters
export function convertToQueryString(obj: any): string {
  var str = [];
  for (var property in obj)
    if (obj.hasOwnProperty(property)) {
      str.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    }
  return '?' + str.join("&");
}