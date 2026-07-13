import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type HomePageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const redirectTo =
    params.from && params.from.startsWith("/") ? params.from : "/dashboard";

  return (
    <main className="auth-shell flex min-h-dvh items-center justify-center px-4 py-10 sm:px-6">
      <div className="auth-panel mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <section className="relative hidden overflow-hidden rounded-[1.75rem] px-10 py-12 text-primary-foreground lg:block">
          <div className="auth-glow absolute inset-0 bg-[linear-gradient(145deg,oklch(0.32_0.07_160),oklch(0.28_0.05_180)_55%,oklch(0.24_0.04_150))]" />
          <div className="absolute -top-16 -right-10 size-56 rounded-full bg-[oklch(0.72_0.09_155_/_0.25)] blur-3xl" />
          <div className="absolute bottom-10 left-8 size-40 rounded-full bg-[oklch(0.7_0.06_190_/_0.22)] blur-3xl" />

          <div className="relative z-10 flex h-full min-h-[34rem] flex-col justify-between">
            <div>
              <p className="font-heading text-5xl tracking-tight italic">Vault</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
                A calm workspace with token-based sessions. Sign in once, stay
                protected across routes.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs tracking-[0.2em] text-primary-foreground/55 uppercase">
                Session security
              </p>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li>JWT signed with HS256</li>
                <li>HttpOnly cookie transport</li>
                <li>Middleware-protected routes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="font-heading text-4xl tracking-tight italic text-foreground">
              Vault
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <Card className="border-0 bg-card/90 shadow-[0_24px_80px_-40px_oklch(0.3_0.05_155_/_0.55)] backdrop-blur-md ring-1 ring-border/70">
            <CardHeader className="gap-2">
              <CardTitle className="font-heading text-3xl font-normal tracking-tight">
                Welcome back
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Use the demo account to explore the JWT auth flow.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <LoginForm redirectTo={redirectTo} />

              <Separator />

              <div className="rounded-xl bg-secondary/70 px-4 py-3 text-sm text-secondary-foreground">
                <p className="font-medium">Demo credentials</p>
                <p className="mt-1 text-muted-foreground">
                  demo@vault.app / password123
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
