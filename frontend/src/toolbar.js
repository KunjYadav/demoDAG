// toolbar.js
import { DraggableNode } from "./draggableNode";
import {
  Type,
  Brain,
  StickyNote,
  Clock,
  Search,
  Code2,
  Image as ImageIcon,
  LucideTextCursorInput,
  LucideFileOutput,
} from "lucide-react";

export const PipelineToolbar = () => {
  return (
    <div className='pipeline-toolbar'>
      <DraggableNode
        type='customInput'
        label='Input'
        icon={LucideTextCursorInput}
      />
      <DraggableNode type='llm' label='LLM' icon={Brain} />
      <DraggableNode
        type='customOutput'
        label='Output'
        icon={LucideFileOutput}
      />
      <DraggableNode type='text' label='Text' icon={Type} />
      <DraggableNode type='note' label='Note' icon={StickyNote} />
      <DraggableNode type='timer' label='Delay' icon={Clock} />
      <DraggableNode type='search' label='Search' icon={Search} />
      <DraggableNode type='code' label='JS Code' icon={Code2} />
      <DraggableNode type='image' label='Image Gen' icon={ImageIcon} />
    </div>
  );
};
