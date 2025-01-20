import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'


// modal info end

const AppliedTrainerDetailsRejectBtnModal = ({ close, isOpen, email, register, handleSubmit, errors, onSubmit }) => {

    return (
        <div>

            <Dialog open={isOpen} as="div" className="bg-black" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl rounded-xl  bg-black/80 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-white">Message for: </Label>
                                    {/* <Description className="text-sm/6 text-white/50">Use your real name so people will recognize you.</Description> */}
                                    <Input
                                        defaultValue={email}
                                        readOnly
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                    />
                                </Field>
                            </DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-2 text-sm/6 text-white/50">
                                    {/* <Field>
                                    <Label className="text-sm/6 font-medium text-white">Rejection message</Label>
                                    <Textarea
                                        className={clsx(
                                            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        rows={3}
                                    />
                                </Field> */}

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Other Info</label>
                                        {/* otherInfo */}
                                        <textarea
                                            {...register('otherInfo', { required: true })}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.otherInfo && <p className="text-red-500 text-sm mt-1">This field is required</p>}

                                    </div>

                                </div>
                                <div className="mt-4">
                                    <Button
                                        type='submit'
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    // onClick={close}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </div>
    )
}

export default AppliedTrainerDetailsRejectBtnModal
