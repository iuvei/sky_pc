export default async function(promise) {
  return promise.then(data => [null, data]).catch(err => [err]);
}
