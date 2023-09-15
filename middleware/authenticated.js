export default function ({app, redirect}) {

  const accessTokenCookie = app.$cookiz.get('accessTokenCookie');

  if (!accessTokenCookie) {
    return redirect("/login");
  }
}
