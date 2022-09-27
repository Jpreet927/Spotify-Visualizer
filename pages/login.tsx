import React from "react";
import {
    ClientSafeProvider,
    getProviders,
    LiteralUnion,
    signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface LoginProps {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    >;
}

const Login: React.FC<LoginProps> = ({ providers }) => {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img
                className="w-52 mb-5"
                src="http://links.papareact.com/9xl"
                alt=""
            />
            {Object.values(providers).map((provider) => (
                <div
                    key={provider.name}
                    className="transform transition duration-500 hover:scale-110"
                >
                    <button
                        className="bg-[#18D860] text-white px-6 py-3 rounded-full"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: "/" })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
