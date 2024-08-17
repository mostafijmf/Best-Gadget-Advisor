// <!-- Delete a user -->
export async function DELETE(req, { params }) {
    try {
        // <!-- Checking user role for admin -->
        const { role } = JSON.parse(headers().get('userInfo'));
        if (role !== 'admin') {
            return NextResponse.json({ error: "You are not allowed for this route!" }, { status: 403 })
        };


        // <!-- Admin can't be deleted! -->
        const isAdmin = await User.findById({ _id: params.id });
        if (isAdmin.role === 'admin') {
            return NextResponse.json({ error: "Admin can't be deleted!" }, { status: 403 })
        };

        // <!-- Delete a user -->
        await User.findByIdAndDelete({ _id: params.id });

        return NextResponse.json({ success: "Delete successful!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};