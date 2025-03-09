import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Mentorship } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: mentorships } = useQuery<Mentorship[]>({
    queryKey: ["/api/mentorships"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-playfair mb-8">
        Welcome back, {user?.fullName || user?.username}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Mentorship Journey</CardTitle>
          </CardHeader>
          <CardContent>
            {mentorships?.length ? (
              <ul className="space-y-4">
                {mentorships.map((mentorship) => (
                  <li key={mentorship.id} className="p-4 bg-muted rounded-lg">
                    {mentorship.goals}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No active mentorships. Visit the mentorship page to get started!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {user?.goals?.length ? (
              <ul className="list-disc list-inside">
                {user.goals.map((goal, i) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No goals set yet. Update your profile to add some!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
