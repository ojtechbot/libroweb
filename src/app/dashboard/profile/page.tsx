
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/profile-form";
import ProfileAvatar from "@/components/profile-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Suspense fallback={<Skeleton className="h-20 w-20 rounded-full" />}>
            <ProfileAvatar className="h-20 w-20" />
          </Suspense>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Profile Settings</CardTitle>
            <CardDescription>
              Manage how you appear across the platform.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileFormSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
      <Skeleton className="h-10 w-28 mt-4" />
    </div>
  );
}
