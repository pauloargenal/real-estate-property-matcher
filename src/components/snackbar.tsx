interface SnackbarProps {
  message: string;
}

export default function Snackbar(props: SnackbarProps) {
  const { message } = props;

  return (
    <div
      className="py-3 px-6 flex items-center bg-cienna-100 rounded-lg shadow-[0_20px_48px_-10px_rgba(231,136,84,0.5)]"
      data-testid="snackbar"
    >
      <p className="text-white">{message}</p>
    </div>
  );
}
