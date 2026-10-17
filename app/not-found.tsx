import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 sm:py-32">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-muted">
        This page does not exist or has moved. The research overview and the CV are good places to
        start.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">
          <ArrowLeft aria-hidden className="size-4" />
          Home
        </ButtonLink>
        <ButtonLink href="/research" variant="secondary">
          Research
        </ButtonLink>
        <ButtonLink href="/cv" variant="secondary">
          CV
        </ButtonLink>
      </div>
    </Container>
  );
}
