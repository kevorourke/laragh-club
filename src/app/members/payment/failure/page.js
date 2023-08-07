import Modal from "@/components/Modal";

export default function Page() {
  return (
    <Modal
      title="Payment Failed"
      description="Please try again"
      link="/members"
      buttonText="Go back to dashboard"
      colour="red"
    />
  );
}
