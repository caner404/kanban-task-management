import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

export function AddBoardForm() {
  return (
    <form className="flex flex-col gap-6 w-[480px] p-8">
      <h2 className="text-lg">Edit Board</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input placeholder="e.g Web Design" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Columns</Label>
          <div className="flex gap-2">
            <Input value="Todo" className="flex-1" />
            <Button variant="inline">
              <IconCross />
            </Button>
          </div>
          <div className="flex gap-2">
            <Input value="Doing" className="flex-1" />
            <Button variant="inline">
              <IconCross />
            </Button>
          </div>
        </div>
        <Button variant="secondary">+ Add New Column</Button>
      </div>
      <Button variant="primary">Create new Board</Button>
    </form>
  );
}
