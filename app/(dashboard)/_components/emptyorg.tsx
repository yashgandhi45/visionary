import Image from 'next/image';
import { CreateOrganization } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/ui/dialog';

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/placeholders/2.svg" width={400} height={400} alt="Empty"/>
            <h2 className='text-2xl font-semibold mt-6'>Welcome to Visionary</h2>
            <p className='text-muted-foreground text-sm mt-2'>Create an Organization to get Started</p>
            <div className='mt-6'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size= "lg">Create Organization</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            Just to avoid warnings
                        </DialogDescription>
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}