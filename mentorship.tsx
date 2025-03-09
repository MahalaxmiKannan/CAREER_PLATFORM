import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Mentorship() {
  const { data: mentors } = useQuery<User[]>({
    queryKey: ["/api/mentors"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-playfair mb-8">Find a Mentor</h1>

        <div className="grid gap-6">
          {mentors?.map((mentor) => (
            <Card key={mentor.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {mentor.fullName?.charAt(0) || mentor.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{mentor.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {mentor.title}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{mentor.bio}</p>
                {mentor.expertise?.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {mentor.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                )}
                <Button className="mt-4">Request Mentorship</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
