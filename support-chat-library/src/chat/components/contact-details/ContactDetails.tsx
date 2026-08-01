import { getClient } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { NoContactSelected } from "./NoContactSelected";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

export const ContactDetails = () => {
    const { clientId } = useParams();

    const { data: client, isLoading } = useQuery({
        queryKey: ['client', clientId],
        queryFn: () => getClient(clientId),
        enabled: !!clientId
    })

    if (!clientId) {
        return <NoContactSelected />
    }

    if (isLoading && !client) {
        return <ContactInfoSkeleton />
    }

    if (client) {
        return <ContactInfo client={client} />;
    }

    return (
        <div>Client not found</div>
    );
};