import Header from './Header';

export default function Layout(props) {
  console.log(props);
  return (
    <>
      <Header username={props.username} />
      <div>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
}
