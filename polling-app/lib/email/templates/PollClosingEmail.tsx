import { Html, Text, Heading } from "@react-email/components";

export default function PollClosingEmail({ pollTitle }: { pollTitle: string }) {
  return (
    <Html>
      <Heading>⏰ Your poll is closing soon!</Heading>
      <Text>
        The poll <strong>{pollTitle}</strong> is about to close. View results or share final votes now.
      </Text>
    </Html>
  );
}
