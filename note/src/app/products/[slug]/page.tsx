type Props = {
  params: {
    slug: string;
  };
};
export default function PantsPage({ params }: Props) {
  return <div>Products/ {params.slug} Page</div>;
}
