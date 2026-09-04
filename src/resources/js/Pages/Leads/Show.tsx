import CRMLayout from '@/Layouts/CRMLayout'
import type { Lead } from '@/types/lead'
import { router, useForm } from '@inertiajs/react'

interface Activity {
    id: number
    type: string
    description: string
    created_at: string
}

interface LeadNote {
    id: number
    content: string
    created_at: string
}

interface LeadTask {
    id: number
    title: string
    description?: string | null
    due_at?: string | null
    completed: boolean
    created_at: string
}

interface ShowProps {
    lead: Lead & {
        notes?: LeadNote[]
        activities?: Activity[]
        tasks?: LeadTask[]
    }
}

export default function Show({
    lead,
}: ShowProps) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        content: '',
    })

    const statuses = [
        'new',
        'contacted',
        'qualified',
        'won',
        'lost', 
    ];

    const updateStatus = (
        status: string
    ) => {
        router.patch(
            `/leads/${lead.id}/status`,
            {status},
            {preserveScroll:true},
        )
    }

    const submit = () => {
        post(`/leads/${lead.id}/notes`, {
            preserveScroll: true,
            onSuccess: () =>
                setData('content', ''),
        })
    }

    const taskForm = useForm({
        title: '',
        due_at: '',
    });

    const submitTask = () => {
        taskForm.post(`/leads/${lead.id}/tasks`, {
            preserveScroll: true,
            onSuccess: () => {
                taskForm.reset()
            },
        })
    }

    const toggleTask = (taskId: number) => {
        router.patch(
            `/tasks/${taskId}/toggle`,
            {},
            {
                preserveScroll: true,
            }
        )
    }

    const convertLead = () => {
        router.post(
            `/leads/${lead.id}/convert`
        )
    }

    return (
        <CRMLayout>
            <div className="min-h-screen bg-slate-100 p-8">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* HERO CARD */}
                    <div className="rounded-[32px] shadow-sm border border-slate-200 p-8">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full bg-blue-600  flex items-center justify-center text-3xl font-bold">
                                    {lead.name.charAt(0)}
                                </div>

                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900">
                                        {lead.name}
                                    </h1>

                                    <div className="mt-2 text-slate-500">
                                        {lead.email}
                                    </div>

                                    <div className="text-slate-500">
                                        {lead.phone}
                                    </div>
                                </div>
                            </div>

                           <div className="flex gap-2 flex-wrap">
                              {statuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() =>
                                        updateStatus(status)
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition
                                    ${
                                        lead.status === status
                                            ? 'bg-blue-600 shadow-sm'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}>
                                    {status}
                                </button>
                              ))}
                           </div>
                            {lead.status !== 'won' ? null : (
                            <button
                                onClick={convertLead}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-medium"
                            >
                                Convert to Client
                            </button>
                            )}
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-3 gap-6">

                        {/* LEFT */}
                        <div className="col-span-2 space-y-6">

                            {/* CONTACT */}
                            <div className="rounded-[32px] shadow-sm border border-slate-200 p-8">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    Contact Details
                                </h2>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50 rounded-2xl p-5">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Email
                                        </div>

                                        <div className="font-medium text-slate-700">
                                            {lead.email}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-5">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Phone
                                        </div>

                                        <div className="font-medium text-slate-700">
                                            {lead.phone}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-5">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Status
                                        </div>

                                        <div className="font-medium capitalize text-slate-700">
                                            {lead.status}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NOTES */}
                            <div className="rounded-[32px] shadow-sm border border-slate-200 p-8">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    Notes
                                </h2>

                                <div className="space-y-4">
                                    <textarea
                                        value={data.content}
                                        onChange={(e) =>
                                            setData(
                                                'content',
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        placeholder="Add a note..."
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />

                                    {errors.content && (
                                        <div className="text-red-500 text-sm">
                                            {errors.content}
                                        </div>
                                    )}

                                    <button
                                        onClick={submit}
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-2xl font-medium disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Note'}
                                    </button>
                                </div>

                                {/* NOTES LIST */}
                                <div className="mt-8 space-y-4">
                                    {lead.notes?.length === 0 && (
                                        <div className="text-slate-400 text-sm">
                                            No notes yet
                                        </div>
                                    )}

                                    {lead.notes?.map(
                                        (note) => (
                                            <div
                                                key={note.id}
                                                className="bg-slate-50 rounded-3xl border border-slate-200 p-5"
                                            >
                                                <p className="text-slate-700 leading-relaxed">
                                                    {
                                                        note.content
                                                    }
                                                </p>

                                                <div className="text-xs text-slate-400 mt-4">
                                                    {
                                                        note.created_at
                                                    }
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* TASKS */}
                            <div className="rounded-[32px] shadow-sm border border-slate-200 p-8">
                                <div className="flex items-center justify-between mb-6">
                                     <div>
                                         <h2 className="text-xl font-semibold text-slate-900">
                                            Tasks
                                        </h2>

                                        <p className='text-sm text-slate-400 mt-1'>
                                            Follow-ups and reminders for this lead
                                        </p>
                                     </div>

                                     <span className="text-sm text-slate-400">
                                        {lead.tasks?.filter((task) => !task.completed).length ?? 0} open
                                     </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <input 
                                        value={taskForm.data.title}
                                        onChange={(e) =>
                                            taskForm.setData('title', e.target.value)
                                        }
                                        placeholder="Task title..."
                                        className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input 
                                        type="date"
                                        value={taskForm.data.due_at}
                                        onChange={(e)=>
                                            taskForm.setData('due_at', e.target.value)
                                        }
                                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {taskForm.errors.title && (
                                    <div className="text-red-500 text-sm mb-4">
                                        {taskForm.errors.title}
                                    </div>
                                )}
                                
                                <button
                                    onClick={submitTask}
                                    disabled={taskForm.processing}
                                     className="hover:bg-slate-800 transition px-5 py-3 rounded-2xl font-medium disabled:opacity-50 mb-8"
                                >
                                    {taskForm.processing ? 'Creating...' : '+ Add Task'}
                                </button>

                                <div className="space-y-3">
                                    {lead.tasks?.length === 0 && (
                                        <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
                                            No tasks yet. Add a follow-up task.
                                        </div>
                                    )}

                                    {lead.tasks?.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`
                                                group rounded-3xl border p-5 transition
                                                ${
                                                    task.completed
                                                        ? 'bg-slate-50 border-slate-200 opacity-70'
                                                        : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30'
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-4">
                                                <button
                                                    onClick={() => toggleTask(task.id)}
                                                    className={`
                                                        mt-1 flex h-6 w-6 items-center justify-center rounded-full border transition
                                                        ${
                                                            task.completed
                                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                                : 'border-slate-300 hover:border-blue-500'
                                                        }
                                                    `}
                                                >
                                                    {task.completed ? '✓' : ''}
                                                </button>
                                                <div className="flex-1">
                                                    <div
                                                        className={`
                                                            font-medium
                                                            ${
                                                                task.completed
                                                                    ? 'line-through text-slate-400'
                                                                    : 'text-slate-800'
                                                            }
                                                        `}
                                                    >
                                                        {task.title}
                                                    </div>

                                                     {task.due_at && (
                                                        <div className="text-sm text-slate-400 mt-2">
                                                            Due: {new Date(task.due_at).toLocaleDateString()}
                                                        </div>
                                                     )}
                                                </div>
                                                <span
                                                    className={`
                                                        rounded-full px-3 py-1 text-xs font-medium
                                                        ${
                                                            task.completed
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-amber-100 text-amber-700'
                                                        }
                                                    `}
                                                >
                                                    {task.completed ? 'Done' : 'Open'}
                                                </span>
                                            </div>
                                        </div>
                                     ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
                            <div className="rounded-[32px] shadow-sm border border-slate-200 p-8 sticky top-8">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    Activity Timeline
                                </h2>

                                <span className='text-sm text-slate-400'>
                                    {lead.activities?.length ?? 0} events
                                </span>

                                <div className="space-y-6">
                                    {lead.activities?.length === 0 && (
                                        <div className="text-slate-400 text-sm">
                                            No activity yet
                                        </div>
                                    )}

                                    {lead.activities?.map(
                                        (activity) => {
                                            const color = 
                                                activity.type ===
                                                'lead_created'
                                                    ? 'bg-blue-500'
                                                    : activity.type ===
                                                       'note_added'
                                                        ? 'bg-emerald-500'
                                                        : 'bg-slate-400'
                                        
                                            return (
                                                <div
                                                    key={activity.id}
                                                    className='relative pl-6 border-1-1 border-slate-200'
                                                >
                                                    <div
                                                         className={`absolute -left-[9px] top-1 
                                                                     w-4 h-4 rounded-full ${color}`}
                                                    />
                                                    <div
                                                        className='font-medium text-slate-700'
                                                    >
                                                        {activity.description}
                                                    </div>
                                                    <div className="text-sm text-slate-400 mt-1">
                                                        {new Date(
                                                            activity.created_at
                                                        ).toLocaleString()}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CRMLayout>
    )
}