import Image from "next/image";

export default function DesktopMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-radial from-safarim-gray-100/0 to-safarim-gray-100 p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src="https://picsum.photos/200/300"
            alt="Mobile device"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          At the moment, Safarim is only available on mobile platforms
        </h1>
        <p className="text-lg text-safarim-gray-800">
          You can always use our service through your mobile device
        </p>
      </div>
    </div>
  );
}
