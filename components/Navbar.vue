<template>
    <div
        class="flex justify-between items-center px-4 py-4 bg-[#0C9DDA] border-b border-blue shadow-md"
    >
        <div class="flex items-center gap-2 p-2 rounded group cursor-pointer">
            <img
                src="/machinas.svg"
                alt="Logo"
                class="h-10 w-10 object-cover group-hover:scale-110 transition-transform"
            />
            <router-link
                to="/"
                class="text-lg font-bold text-white transition-all transform group-hover:ml-2 group-hover:scale-110 group-hover:bg-red group-hover:text-gradient"
            >
                Machinas Overflow
            </router-link>
        </div>

        <ul class="flex space-x-4">
            <li>
                <router-link
                    to="/notifications"
                    class="text-white hover:text-gray-200"
                >
                    <img
                        src="/notifications.svg"
                        alt="Logo"
                        class="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                    />
                </router-link>
            </li>
            <li>
                <router-link
                    to="/account"
                    class="text-white hover:text-gray-200"
                >
                    <img
                        src="/account.svg"
                        alt="Logo"
                        class="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                    />
                </router-link>
            </li>
            <li>
                <button @click="logout" class="text-white hover:text-gray-200">
                    <img
                        src="/logout.svg"
                        alt="Logo"
                        class="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                    />
                </button>
            </li>
        </ul>
    </div>
</template>
