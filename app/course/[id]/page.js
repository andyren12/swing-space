export default function page({ params }) {
  const { id } = params;
  return <div>Course {id}</div>;
}
