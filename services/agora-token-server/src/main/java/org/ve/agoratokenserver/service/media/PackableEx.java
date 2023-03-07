package org.ve.agoratokenserver.service.media;

public interface PackableEx extends Packable {
    void unmarshal(ByteBuf in);
}
