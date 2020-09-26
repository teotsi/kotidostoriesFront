export default function ({store, redirect}) {
  console.log(store.$auth)
  if (!store.$auth.loggedIn) {
    redirect('/');
  }
}
