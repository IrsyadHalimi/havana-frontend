interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  loading?: boolean;
}

export default function Button({

  loading,

  children,

  ...props

}: Props) {

  return (

    <button

      {...props}

      disabled={loading}

      className="w-full rounded-xl bg-brand-green py-3 text-white"

    >

      {loading
        ? "Loading..."
        : children}

    </button>

  );

}