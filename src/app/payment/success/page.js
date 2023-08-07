import Modal from "@/components/Modal";

export default function Page() {
  return (
    <Modal
      title="Payment Success"
      description="You should have received an email reciept"
      link="/members"
      buttonText="Go back to dashboard"
      colour="green"
    />
  );
}