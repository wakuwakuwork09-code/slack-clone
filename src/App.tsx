import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                S
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">Slack Clone</CardTitle>
          <p className="text-muted-foreground text-sm">
            Vite + React + TypeScript + Tailwind CSS + shadcn/ui
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-4">
          <Input placeholder="メッセージを入力..." />
          <Button className="w-full">送信</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
