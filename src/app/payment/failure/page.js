import Modal from "@/components/Modal";

export default function Page() {
  return (
    <Modal
      title="Payment Failed"
      description="Please try again"
      link="/"
      buttonText="Go back to home"
      colour="red"
    />
  );
}
