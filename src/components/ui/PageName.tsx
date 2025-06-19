export default function PageName({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-center text-xl font-semibold md:text-2xl lg:text-left lg:text-3xl">
        {title}
      </h2>
    </>
  );
}
