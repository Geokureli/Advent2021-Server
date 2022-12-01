(function ($hx_exports, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class Game {
	constructor() {
	}
	processAvatarMessage(data,avatar,state) {
		if(avatar == null) {
			return;
		}
		if(data == null) {
			console.log("Game.hx:18:","null avatar data");
			return;
		}
		if(data.x != null) {
			avatar.x = data.x;
		}
		if(data.y != null) {
			avatar.y = data.y;
		}
		if(data.name != null) {
			avatar.name = data.name;
		}
		if(data.skin != null) {
			avatar.skin = data.skin;
		}
		if(data.state != null) {
			avatar.state = data.state;
		}
		if(data.netState != null) {
			avatar.netState = data.netState;
		}
		avatar.emote = data.emote != null ? data.emote : 0;
	}
	init() {
	}
	update(dt,state) {
	}
}
$hx_exports["Game"] = Game;
Game.__name__ = true;
Object.assign(Game.prototype, {
	__class__: Game
});
class HxOverrides {
	static remove(a,obj) {
		let i = a.indexOf(obj);
		if(i == -1) {
			return false;
		}
		a.splice(i,1);
		return true;
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class Lambda {
	static count(it,pred) {
		let n = 0;
		if(pred == null) {
			let _ = $getIterator(it);
			while(_.hasNext()) {
				let _1 = _.next();
				++n;
			}
		} else {
			let x = $getIterator(it);
			while(x.hasNext()) {
				let x1 = x.next();
				if(pred(x1)) {
					++n;
				}
			}
		}
		return n;
	}
}
Lambda.__name__ = true;
Math.__name__ = true;
class NetBits {
	static checkMax(i) {
		if(i > 8) {
			throw haxe_Exception.thrown("bit:" + i + " is too high");
		}
	}
	static _new(value) {
		let this1 = value;
		return this1;
	}
	static getBool(this1,i) {
		if(i > 8) {
			throw haxe_Exception.thrown("bit:" + i + " is too high");
		}
		return 1 == (this1 >> i & 1);
	}
	static setBool(this1,i,value) {
		this1 = this1 & ~(1 << i) | (value ? 1 : 0) << i;
		return value;
	}
	static ceilPow2(num) {
		return 1 << Math.ceil(Math.log(num) / NetBits.LG);
	}
	static getBits(this1,i,numBits) {
		let i1 = i + numBits - 1;
		if(i1 > 8) {
			throw haxe_Exception.thrown("bit:" + i1 + " is too high");
		}
		let bitmask = (1 << numBits) - 1;
		return this1 >> i & bitmask;
	}
	static setBits(this1,i,numBits,value) {
		let value1 = value;
		if(Math.ceil(Math.log(value1 + 1) / NetBits.LG) > numBits) {
			throw haxe_Exception.thrown("" + value1 + " is too high, max:" + (1 << numBits));
		}
		let bitmask = (1 << numBits) - 1;
		this1 = this1 & ~(bitmask << i) | value1 << i;
		return this1;
	}
	static getInt(this1,i,numBits) {
		let i1 = i + numBits - 1;
		if(i1 > 8) {
			throw haxe_Exception.thrown("bit:" + i1 + " is too high");
		}
		let bitmask = (1 << numBits) - 1;
		return this1 >> i & bitmask;
	}
	static setInt(this1,i,numBits,value) {
		if(Math.ceil(Math.log(value + 1) / NetBits.LG) > numBits) {
			throw haxe_Exception.thrown("" + value + " is too high, max:" + (1 << numBits));
		}
		let bitmask = (1 << numBits) - 1;
		this1 = this1 & ~(bitmask << i) | value << i;
		return this1;
	}
	static toString(this1) {
		let copy = this1;
		let str = "";
		while(copy != 0) {
			str = Std.string(copy & 1) + str;
			copy >>= 1;
		}
		return str;
	}
}
class Reflect {
	static getProperty(o,field) {
		let tmp;
		if(o == null) {
			return null;
		} else {
			let tmp1;
			if(o.__properties__) {
				tmp = o.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return o[tmp]();
			} else {
				return o[field];
			}
		}
	}
}
Reflect.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class Type {
	static createInstance(cl,args) {
		let ctor = Function.prototype.bind.apply(cl,[null].concat(args));
		return new (ctor);
	}
}
Type.__name__ = true;
class GState {
	constructor(avatars) {
		this.avatars = avatars;
	}
}
GState.__name__ = true;
Object.assign(GState.prototype, {
	__class__: GState
});
class AvatarState {
	constructor(id,x,y,skin,emote,netState,state) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.skin = skin;
		this.emote = emote;
		this.netState = netState;
		this.state = state;
	}
}
AvatarState.__name__ = true;
Object.assign(AvatarState.prototype, {
	__class__: AvatarState
});
class PlayerState {
	static _new(value) {
		let this1 = value;
		let this2 = this1;
		PlayerState.toString(this2);
		return this2;
	}
	static get_flipped(this1) {
		return 1 == (this1 & 1);
	}
	static set_flipped(this1,value) {
		this1 = this1 & -2 | (value ? 1 : 0);
		return value;
	}
	static get_infected(this1) {
		return 1 == (this1 >> 1 & 1);
	}
	static set_infected(this1,value) {
		this1 = this1 & -3 | (value ? 1 : 0) << 1;
		return value;
	}
	static toString(this1) {
		return "{ flipped:" + Std.string(1 == (this1 & 1)) + ", infected:" + Std.string(1 == (this1 >> 1 & 1)) + " }";
	}
	static toBinaryString(this1) {
		return NetBits.toString(this1);
	}
}
PlayerState.__properties__ = {set_infected: "set_infected",get_infected: "get_infected",set_flipped: "set_flipped",get_flipped: "get_flipped"};
class UInt {
	static gt(a,b) {
		let aNeg = a < 0;
		let bNeg = b < 0;
		if(aNeg != bNeg) {
			return aNeg;
		} else {
			return a > b;
		}
	}
	static toFloat(this1) {
		let int = this1;
		if(int < 0) {
			return 4294967296.0 + int;
		} else {
			return int + 0.0;
		}
	}
}
class haxe_IMap {
}
haxe_IMap.__name__ = true;
Object.assign(haxe_IMap.prototype, {
	__class__: haxe_IMap
});
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
	,__properties__: {get_native: "get_native"}
});
class haxe__$Int64__$_$_$Int64 {
	constructor(high,low) {
		this.high = high;
		this.low = low;
	}
}
haxe__$Int64__$_$_$Int64.__name__ = true;
Object.assign(haxe__$Int64__$_$_$Int64.prototype, {
	__class__: haxe__$Int64__$_$_$Int64
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
class haxe_ds_IntMap {
	constructor() {
		this.h = { };
	}
	set(key,value) {
		this.h[key] = value;
	}
	get(key) {
		return this.h[key];
	}
	exists(key) {
		return this.h.hasOwnProperty(key);
	}
	remove(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	keys() {
		let a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	iterator() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			let i = this.it.next();
			return this.ref[i];
		}};
	}
	keyValueIterator() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	copy() {
		let copied = new haxe_ds_IntMap();
		let key = this.keys();
		while(key.hasNext()) {
			let key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	clear() {
		this.h = { };
	}
}
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_IntMap.prototype, {
	__class__: haxe_ds_IntMap
});
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
	exists(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	get(key) {
		return this.h[key];
	}
	set(key,value) {
		this.h[key] = value;
	}
	remove(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	keys() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	keyValueIterator() {
		return new haxe_ds__$StringMap_StringMapKeyValueIterator(this.h);
	}
	clear() {
		this.h = Object.create(null);
	}
}
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
});
class haxe_ds__$StringMap_StringMapKeyIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		return this.keys[this.current++];
	}
}
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = true;
Object.assign(haxe_ds__$StringMap_StringMapKeyIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapKeyIterator
});
class haxe_ds__$StringMap_StringMapKeyValueIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		let key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
}
haxe_ds__$StringMap_StringMapKeyValueIterator.__name__ = true;
Object.assign(haxe_ds__$StringMap_StringMapKeyValueIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapKeyValueIterator
});
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getDouble(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	getFloat(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	getInt32(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	getInt64(pos) {
		let this1 = new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
		return this1;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			let debug = pos > 0;
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let c2 = b[i++];
					let code = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let c2 = b[i++];
					let c3 = b[i++];
					let u = (c & 15) << 18 | (c2 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
}
haxe_io_Bytes.__name__ = true;
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class haxe_iterators_MapKeyValueIterator {
	constructor(map) {
		this.map = map;
		this.keys = map.keys();
	}
	hasNext() {
		return this.keys.hasNext();
	}
	next() {
		let key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
}
haxe_iterators_MapKeyValueIterator.__name__ = true;
Object.assign(haxe_iterators_MapKeyValueIterator.prototype, {
	__class__: haxe_iterators_MapKeyValueIterator
});
class io_colyseus_serializer_schema_Context {
	constructor() {
		this.schemas = [];
		this.typeIds = new haxe_ds_IntMap();
	}
	add(schema,typeid) {
		if(typeid == null) {
			typeid = this.schemas.length;
		}
		this.typeIds.h[typeid] = schema;
		this.schemas.push(schema);
	}
	get(typeid) {
		return this.typeIds.h[typeid];
	}
}
io_colyseus_serializer_schema_Context.__name__ = true;
Object.assign(io_colyseus_serializer_schema_Context.prototype, {
	__class__: io_colyseus_serializer_schema_Context
});
class io_colyseus_serializer_schema_types_IRef {
}
io_colyseus_serializer_schema_types_IRef.__name__ = true;
Object.assign(io_colyseus_serializer_schema_types_IRef.prototype, {
	__class__: io_colyseus_serializer_schema_types_IRef
});
class io_colyseus_serializer_schema_types_ISchemaCollection {
}
io_colyseus_serializer_schema_types_ISchemaCollection.__name__ = true;
io_colyseus_serializer_schema_types_ISchemaCollection.__interfaces__ = [io_colyseus_serializer_schema_types_IRef];
Object.assign(io_colyseus_serializer_schema_types_ISchemaCollection.prototype, {
	__class__: io_colyseus_serializer_schema_types_ISchemaCollection
});
class io_colyseus_serializer_schema_types_ArraySchemaImpl {
	constructor() {
		this.indexes = new io_colyseus_serializer_schema_types_OrderedMap(new haxe_ds_IntMap());
		this.items = new haxe_ds_IntMap();
	}
	getIndex(fieldIndex) {
		return this.indexes.get(fieldIndex);
	}
	setIndex(fieldIndex,dynamicIndex) {
		this.indexes.set(fieldIndex,dynamicIndex);
	}
	getByIndex(fieldIndex) {
		let targetIndex = -1;
		let i = 0;
		let _g_current = 0;
		let _g_array = this.indexes._keys;
		while(_g_current < _g_array.length) {
			let key = _g_array[_g_current++];
			if(i == fieldIndex) {
				targetIndex = this.indexes.get(key);
				break;
			}
			++i;
		}
		if(targetIndex == -1) {
			return null;
		} else {
			let this1 = this.items;
			let key = this.indexes.get(targetIndex);
			return this1.h[key];
		}
	}
	setByIndex(index,dynamicIndex,value) {
		this.indexes.set(index,dynamicIndex);
		this.items.h[dynamicIndex] = value;
	}
	deleteByIndex(fieldIndex) {
		let index = this.indexes.get(fieldIndex);
		this.items.remove(index);
		this.indexes.remove(fieldIndex);
	}
	get_length() {
		return Lambda.count(this.items);
	}
	onAdd(item,key) {
	}
	onChange(item,key) {
	}
	onRemove(item,key) {
	}
	invokeOnAdd(item,key) {
		this.onAdd(item,key);
	}
	invokeOnChange(item,key) {
		this.onChange(item,key);
	}
	invokeOnRemove(item,key) {
		this.onRemove(item,key);
	}
	moveEventHandlers(previousInstance) {
		this.onAdd = previousInstance.onAdd;
		this.onChange = previousInstance.onChange;
		this.onRemove = previousInstance.onRemove;
	}
	clear(refs) {
		if(typeof(this._childType) != "string") {
			let item = this.items.iterator();
			while(item.hasNext()) {
				let item1 = item.next();
				refs.remove(Reflect.getProperty(item1,"__refId"));
			}
		}
		this.items.h = { };
		this.indexes.clear();
	}
	clone() {
		let cloned = new io_colyseus_serializer_schema_types_ArraySchemaImpl();
		cloned.items = this.items.copy();
		cloned.onAdd = $bind(this,this.onAdd);
		cloned.onChange = $bind(this,this.onChange);
		cloned.onRemove = $bind(this,this.onRemove);
		return cloned;
	}
	iterator() {
		return this.items.iterator();
	}
	keyValueIterator() {
		return new haxe_iterators_MapKeyValueIterator(this.items);
	}
	toString() {
		let data = [];
		let item = this.items.iterator();
		while(item.hasNext()) {
			let item1 = item.next();
			data.push("" + Std.string(item1));
		}
		return "ArraySchema(" + Lambda.count(this.items) + ") { __refId => " + this.__refId + ", " + data.join(", ") + " } ";
	}
}
io_colyseus_serializer_schema_types_ArraySchemaImpl.__name__ = true;
io_colyseus_serializer_schema_types_ArraySchemaImpl.__interfaces__ = [io_colyseus_serializer_schema_types_ISchemaCollection,io_colyseus_serializer_schema_types_IRef];
Object.assign(io_colyseus_serializer_schema_types_ArraySchemaImpl.prototype, {
	__class__: io_colyseus_serializer_schema_types_ArraySchemaImpl
	,__properties__: {get_length: "get_length"}
});
class io_colyseus_serializer_schema_types_MapSchema {
	constructor() {
		this.indexes = new haxe_ds_IntMap();
		this.items = new io_colyseus_serializer_schema_types_OrderedMap(new haxe_ds_StringMap());
		this.__isMapSchema = true;
	}
	getIndex(fieldIndex) {
		return this.indexes.h[fieldIndex];
	}
	setIndex(fieldIndex,dynamicIndex) {
		this.indexes.h[fieldIndex] = dynamicIndex;
	}
	getByIndex(fieldIndex) {
		let index = this.indexes.h[fieldIndex];
		if(index != null) {
			return this.items.get(index);
		} else {
			return null;
		}
	}
	setByIndex(index,dynamicIndex,value) {
		this.indexes.h[index] = dynamicIndex;
		this.items.set(dynamicIndex,value);
	}
	deleteByIndex(fieldIndex) {
		let index = this.indexes.h[fieldIndex];
		this.items.remove(index);
		this.indexes.remove(fieldIndex);
	}
	get_length() {
		return Lambda.count(this.items._keys);
	}
	onAdd(item,key) {
	}
	onChange(item,key) {
	}
	onRemove(item,key) {
	}
	invokeOnAdd(item,key) {
		this.onAdd(item,key);
	}
	invokeOnChange(item,key) {
		this.onChange(item,key);
	}
	invokeOnRemove(item,key) {
		this.onRemove(item,key);
	}
	moveEventHandlers(previousInstance) {
		this.onAdd = previousInstance.onAdd;
		this.onChange = previousInstance.onChange;
		this.onRemove = previousInstance.onRemove;
	}
	clear(refs) {
		if(typeof(this._childType) != "string") {
			let item = this.items.iterator();
			while(item.hasNext()) {
				let item1 = item.next();
				refs.remove(Reflect.getProperty(item1,"__refId"));
			}
		}
		this.items.clear();
		this.indexes.h = { };
	}
	clone() {
		let cloned = new io_colyseus_serializer_schema_types_MapSchema();
		let _g = 0;
		let _g1 = this.items._keys;
		while(_g < _g1.length) {
			let key = _g1[_g];
			++_g;
			cloned.items.set(key,this.items.get(key));
		}
		cloned.onAdd = $bind(this,this.onAdd);
		cloned.onChange = $bind(this,this.onChange);
		cloned.onRemove = $bind(this,this.onRemove);
		return cloned;
	}
	iterator() {
		return this.items.iterator();
	}
	keyValueIterator() {
		return this.items.keyValueIterator();
	}
	get(key) {
		return this.items.get(key);
	}
	arrayWrite(key,value) {
		this.items.set(key,value);
		return value;
	}
	toString() {
		let data = [];
		let _g = 0;
		let _g1 = this.items._keys;
		while(_g < _g1.length) {
			let key = _g1[_g];
			++_g;
			data.push(key + " => " + Std.string(this.items.get(key)));
		}
		return "MapSchema (" + Lambda.count(this.items) + ", __refId => " + this.__refId + ") { " + data.join(", ") + " }";
	}
}
io_colyseus_serializer_schema_types_MapSchema.__name__ = true;
io_colyseus_serializer_schema_types_MapSchema.__interfaces__ = [io_colyseus_serializer_schema_types_ISchemaCollection,io_colyseus_serializer_schema_types_IRef];
Object.assign(io_colyseus_serializer_schema_types_MapSchema.prototype, {
	__class__: io_colyseus_serializer_schema_types_MapSchema
	,__properties__: {get_length: "get_length"}
});
class io_colyseus_serializer_schema_CustomType {
	constructor() {
		this.customTypes = new haxe_ds_StringMap();
		this.types = [];
		this.set("array",io_colyseus_serializer_schema_types_ArraySchemaImpl);
		this.set("map",io_colyseus_serializer_schema_types_MapSchema);
	}
	set(id,type) {
		if(!Object.prototype.hasOwnProperty.call(this.customTypes.h,id)) {
			this.customTypes.h[id] = type;
			this.types.push(id);
		}
	}
	get(id) {
		return this.customTypes.h[id];
	}
	getTypes() {
		let customTypes = [];
		let h = this.customTypes.h;
		let key_h = h;
		let key_keys = Object.keys(h);
		let key_length = key_keys.length;
		let key_current = 0;
		while(key_current < key_length) {
			let key = key_keys[key_current++];
			customTypes.push(key);
		}
		return customTypes;
	}
	static getInstance() {
		return io_colyseus_serializer_schema_CustomType.instance;
	}
}
io_colyseus_serializer_schema_CustomType.__name__ = true;
Object.assign(io_colyseus_serializer_schema_CustomType.prototype, {
	__class__: io_colyseus_serializer_schema_CustomType
});
class io_colyseus_serializer_schema_ReferenceTracker {
	constructor() {
		this.deletedRefs = new haxe_ds_IntMap();
		this.refCounts = new haxe_ds_IntMap();
		this.refs = new haxe_ds_IntMap();
		this.context = new io_colyseus_serializer_schema_Context();
	}
	add(refId,ref,increment) {
		if(increment == null) {
			increment = true;
		}
		this.refs.h[refId] = ref;
		if(increment) {
			let previousCount = this.refCounts.h.hasOwnProperty(refId) ? this.refCounts.h[refId] : 0;
			this.refCounts.h[refId] = previousCount + 1;
		}
	}
	has(refId) {
		return this.refs.h.hasOwnProperty(refId);
	}
	get(refId) {
		return this.refs.h[refId];
	}
	remove(refId) {
		this.refCounts.h[refId] = this.refCounts.h[refId] - 1;
		let addedToDeletedRefs = this.deletedRefs.h[refId] == null;
		if(addedToDeletedRefs) {
			this.deletedRefs.h[refId] = true;
		}
		return addedToDeletedRefs;
	}
	count() {
		return Lambda.count(this.refs);
	}
	garbageCollection() {
		let deletedRefs = [];
		let refId = this.deletedRefs.keys();
		while(refId.hasNext()) {
			let refId1 = refId.next();
			deletedRefs.push(refId1);
		}
		let _g = 0;
		while(_g < deletedRefs.length) {
			let refId = deletedRefs[_g];
			++_g;
			if(this.refCounts.h[refId] <= 0) {
				let ref = this.refs.h[refId];
				if(((ref) instanceof io_colyseus_serializer_schema_Schema)) {
					let childTypes = ref._childTypes;
					let fieldIndex = childTypes.keys();
					while(fieldIndex.hasNext()) {
						let fieldIndex1 = fieldIndex.next();
						let refId = Reflect.getProperty(ref.getByIndex(fieldIndex1),"__refId");
						if(refId > 0 && this.remove(refId)) {
							deletedRefs.push(refId);
						}
					}
				} else if(typeof(ref._childType) != "string") {
					let item = ref.iterator();
					while(item.hasNext()) {
						let item1 = item.next();
						let childRefId = Reflect.getProperty(item1,"__refId");
						if(childRefId > 0 && this.remove(childRefId)) {
							deletedRefs.push(childRefId);
						}
					}
				}
				this.refs.remove(refId);
				this.refCounts.remove(refId);
			}
		}
		this.deletedRefs.h = { };
	}
	clear() {
		this.refs.h = { };
		this.refCounts.h = { };
		this.deletedRefs.h = { };
	}
}
io_colyseus_serializer_schema_ReferenceTracker.__name__ = true;
Object.assign(io_colyseus_serializer_schema_ReferenceTracker.prototype, {
	__class__: io_colyseus_serializer_schema_ReferenceTracker
});
class io_colyseus_serializer_schema_Decorator {
}
io_colyseus_serializer_schema_Decorator.__name__ = true;
class io_colyseus_serializer_schema_Decoder {
	constructor() {
	}
	decodePrimitiveType(type,bytes,it) {
		switch(type) {
		case "boolean":
			return this.boolean(bytes,it);
		case "float32":
			return this.float32(bytes,it);
		case "float64":
			return this.float64(bytes,it);
		case "int16":
			return this.int16(bytes,it);
		case "int32":
			return this.int32(bytes,it);
		case "int64":
			return this.int64(bytes,it);
		case "int8":
			return this.int8(bytes,it);
		case "number":
			return this.number(bytes,it);
		case "string":
			return this.string(bytes,it);
		case "uint16":
			return this.uint16(bytes,it);
		case "uint32":
			return this.uint32(bytes,it);
		case "uint64":
			return this.uint64(bytes,it);
		case "uint8":
			return this.uint8(bytes,it);
		default:
			throw haxe_Exception.thrown("can't decode: " + type);
		}
	}
	string(bytes,it) {
		let prefix = bytes.b[it.offset++];
		let length = 0;
		if(prefix < 192) {
			length = prefix & 31;
		} else if(prefix == 217) {
			length = this.uint8(bytes,it);
		} else if(prefix == 218) {
			length = this.uint16(bytes,it);
		} else if(prefix == 219) {
			length = this.uint32(bytes,it);
		}
		let value = bytes.getString(it.offset,length);
		it.offset += length;
		return value;
	}
	number(bytes,it) {
		let prefix = bytes.b[it.offset++];
		if(prefix < 128) {
			return prefix;
		} else if(prefix == 202) {
			return this.float32(bytes,it);
		} else if(prefix == 203) {
			return this.float64(bytes,it);
		} else if(prefix == 204) {
			return this.uint8(bytes,it);
		} else if(prefix == 205) {
			return this.uint16(bytes,it);
		} else if(prefix == 206) {
			return this.uint32(bytes,it);
		} else if(prefix == 207) {
			return this.uint64(bytes,it);
		} else if(prefix == 208) {
			return this.int8(bytes,it);
		} else if(prefix == 209) {
			return this.int16(bytes,it);
		} else if(prefix == 210) {
			return this.int32(bytes,it);
		} else if(prefix == 211) {
			return this.int64(bytes,it);
		} else if(prefix > 223) {
			return (255 - prefix + 1) * -1;
		}
		return 0;
	}
	boolean(bytes,it) {
		return UInt.gt(this.uint8(bytes,it),0);
	}
	int8(bytes,it) {
		return this.uint8(bytes,it) << 24 >> 24;
	}
	uint8(bytes,it) {
		return bytes.b[it.offset++];
	}
	int16(bytes,it) {
		return this.uint16(bytes,it) << 16 >> 16;
	}
	uint16(bytes,it) {
		return bytes.b[it.offset++] | bytes.b[it.offset++] << 8;
	}
	int32(bytes,it) {
		let value = bytes.getInt32(it.offset);
		it.offset += 4;
		return value;
	}
	uint32(bytes,it) {
		return this.int32(bytes,it);
	}
	int64(bytes,it) {
		let value = bytes.getInt64(it.offset);
		it.offset += 8;
		return value;
	}
	uint64(bytes,it) {
		let low = this.uint32(bytes,it);
		let a = this.uint32(bytes,it);
		let b = Math.pow(2,32);
		let high = UInt.toFloat(a) * b;
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	float32(bytes,it) {
		let value = bytes.getFloat(it.offset);
		it.offset += 4;
		return value;
	}
	float64(bytes,it) {
		let value = bytes.getDouble(it.offset);
		it.offset += 8;
		return value;
	}
}
io_colyseus_serializer_schema_Decoder.__name__ = true;
Object.assign(io_colyseus_serializer_schema_Decoder.prototype, {
	__class__: io_colyseus_serializer_schema_Decoder
});
class io_colyseus_serializer_schema_SPEC {
	static numberCheck(bytes,it) {
		let prefix = bytes.b[it.offset];
		if(prefix >= 128) {
			if(prefix >= 202) {
				return prefix <= 211;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static arrayCheck(bytes,it) {
		return bytes.b[it.offset] < 160;
	}
	static switchToStructureCheck(bytes,it) {
		return bytes.b[it.offset] == io_colyseus_serializer_schema_SPEC.SWITCH_TO_STRUCTURE;
	}
	static stringCheck(bytes,it) {
		let prefix = bytes.get(it.offset);
		if(!(prefix < 192 && prefix > 160 || prefix == 217 || prefix == 218)) {
			return prefix == 219;
		} else {
			return true;
		}
	}
}
io_colyseus_serializer_schema_SPEC.__name__ = true;
class io_colyseus_serializer_schema_Schema {
	constructor() {
		if(io_colyseus_serializer_schema_Schema._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this._refs = null;
		this._childTypes = new haxe_ds_IntMap();
		this._types = new haxe_ds_IntMap();
		this._indexes = new haxe_ds_IntMap();
		this.__refId = 0;
	}
	onChange(changes) {
	}
	onRemove() {
	}
	setByIndex(fieldIndex,dynamicIndex,value) {
		this[this._indexes.h[fieldIndex]] = value;
	}
	getByIndex(fieldIndex) {
		return Reflect.getProperty(this,this._indexes.h[fieldIndex]);
	}
	deleteByIndex(fieldIndex) {
		this[this._indexes.h[fieldIndex]] = null;
	}
	setIndex(fieldIndex,dynamicIndex) {
	}
	getIndex(fieldIndex,dynamicIndex) {
	}
	moveEventHandlers(previousInstance) {
		let previousSchemaInstance = previousInstance;
		this.onChange = $bind(previousSchemaInstance,previousSchemaInstance.onChange);
		this.onRemove = $bind(previousSchemaInstance,previousSchemaInstance.onRemove);
		let map = this._childTypes;
		let _g_map = map;
		let _g_keys = map.keys();
		while(_g_keys.hasNext()) {
			let key = _g_keys.next();
			let _g1_value = _g_map.get(key);
			let _g1_key = key;
			let fieldIndex = _g1_key;
			let _ = _g1_value;
			let childType = this.getByIndex(fieldIndex);
			if(js_Boot.__implements(childType,io_colyseus_serializer_schema_types_IRef)) {
				childType.moveEventHandlers(previousSchemaInstance.getByIndex(fieldIndex));
			}
		}
	}
	decode(bytes,it,refs) {
		if(it == null) {
			it = { offset : 0};
		}
		if(refs == null) {
			refs = this._refs != null ? this._refs : new io_colyseus_serializer_schema_ReferenceTracker();
		}
		this._refs = refs;
		let refId = 0;
		let ref = this;
		refs.add(refId,ref);
		let changes = [];
		let allChanges = new io_colyseus_serializer_schema_types_OrderedMap(new haxe_ds_IntMap());
		allChanges.set(refId,changes);
		let totalBytes = bytes.length;
		while(it.offset < totalBytes) {
			let byte = bytes.b[it.offset++];
			if(byte == io_colyseus_serializer_schema_SPEC.SWITCH_TO_STRUCTURE) {
				refId = io_colyseus_serializer_schema_Schema.decoder.number(bytes,it);
				ref = refs.get(refId);
				if(ref == null) {
					throw haxe_Exception.thrown("refId not found: " + refId);
				}
				changes = [];
				allChanges.set(refId,changes);
				continue;
			}
			let isSchema = ((ref) instanceof io_colyseus_serializer_schema_Schema);
			let operation = isSchema ? byte >> 6 << 6 : byte;
			if(operation == 10) {
				ref.clear(refs);
				continue;
			}
			let fieldIndex = isSchema ? byte % (operation == 0 ? 255 : operation) : io_colyseus_serializer_schema_Schema.decoder.number(bytes,it);
			let fieldName = isSchema ? ref._indexes.h[fieldIndex] : "";
			let fieldType = null;
			let childType = null;
			if(isSchema) {
				childType = ref._childTypes.h[fieldIndex];
				fieldType = ref._types.h[fieldIndex];
			} else {
				let collectionChildType = ref._childType;
				let isPrimitiveFieldType = typeof(collectionChildType) == "string";
				fieldType = isPrimitiveFieldType ? collectionChildType : "ref";
				if(!isPrimitiveFieldType) {
					childType = collectionChildType;
				}
			}
			let value = null;
			let previousValue = null;
			let dynamicIndex = null;
			if(!isSchema) {
				previousValue = ref.getByIndex(fieldIndex);
				if((operation & 128) == 128) {
					dynamicIndex = Reflect.getProperty(ref,"__isMapSchema") == true ? io_colyseus_serializer_schema_Schema.decoder.string(bytes,it) : fieldIndex;
					ref.setIndex(fieldIndex,dynamicIndex);
				} else {
					dynamicIndex = ref.getIndex(fieldIndex);
				}
			} else if(fieldName != null) {
				previousValue = Reflect.getProperty(ref,fieldName);
			}
			if((operation & 64) == 64) {
				if(operation != 192) {
					ref.deleteByIndex(fieldIndex);
				}
				if(js_Boot.__implements(previousValue,io_colyseus_serializer_schema_types_IRef) && previousValue.__refId > 0) {
					refs.remove(previousValue.__refId);
				}
				value = null;
			}
			if(fieldName == null) {
				console.log("io/colyseus/serializer/schema/Schema.hx:514:","WARNING: @colyseus/schema definition mismatch?");
				let nextIterator = { offset : it.offset};
				while(it.offset < totalBytes) {
					if(io_colyseus_serializer_schema_SPEC.switchToStructureCheck(bytes,it)) {
						nextIterator.offset = it.offset + 1;
						if(refs.has(io_colyseus_serializer_schema_Schema.decoder.number(bytes,nextIterator))) {
							break;
						}
					}
					it.offset++;
				}
				continue;
			} else if(operation != 64) {
				if(fieldType == "ref") {
					refId = io_colyseus_serializer_schema_Schema.decoder.number(bytes,it);
					value = refs.get(refId);
					if(operation != 0) {
						let concreteChildType = this.getSchemaType(bytes,it,childType);
						if(value == null) {
							value = Type.createInstance(concreteChildType,[]);
							value.__refId = refId;
							if(previousValue != null) {
								value.moveEventHandlers(previousValue);
								if(previousValue.__refId > 0 && refId != previousValue.__refId) {
									refs.remove(previousValue.__refId);
								}
							}
						}
						refs.add(refId,value,value != previousValue);
					}
				} else if(childType == null) {
					value = io_colyseus_serializer_schema_Schema.decoder.decodePrimitiveType(fieldType,bytes,it);
				} else {
					refId = io_colyseus_serializer_schema_Schema.decoder.number(bytes,it);
					value = refs.get(refId);
					let collectionClass = fieldType == null ? js_Boot.getClass(ref) : io_colyseus_serializer_schema_CustomType.getInstance().get(fieldType);
					let valueRef = refs.has(refId) ? previousValue : Type.createInstance(collectionClass,[]);
					value = valueRef.clone();
					value.__refId = refId;
					value._childType = childType;
					if(previousValue != null) {
						value.moveEventHandlers(previousValue);
						if(previousValue.__refId > 0 && refId != previousValue.__refId) {
							refs.remove(previousValue.__refId);
							let deletes = [];
							let i = 0;
							let _g = [];
							let x = $getIterator(previousValue.items);
							while(x.hasNext()) {
								let x1 = x.next();
								let index = i++;
								_g.push(deletes.push({ op : 64, field : index, dynamicIndex : index, value : null, previousValue : x1}));
							}
							allChanges.set(previousValue.__refId,deletes);
						}
					}
					refs.add(refId,value,valueRef != previousValue);
				}
			}
			let hasChange = previousValue != value;
			if(value != null) {
				ref.setByIndex(fieldIndex,dynamicIndex,value);
			}
			if(hasChange) {
				changes.push({ op : operation, field : fieldName, dynamicIndex : dynamicIndex, value : value, previousValue : previousValue});
			}
		}
		this.triggerChanges(allChanges);
		refs.garbageCollection();
	}
	triggerChanges(allChanges) {
		let refs = this._refs;
		let it = allChanges.keyValueIterator();
		while(it.hasNext()) {
			let it1 = it.next();
			let changes = it1.value;
			if(changes.length == 0) {
				continue;
			}
			let refId = it1.key;
			let ref = refs.get(refId);
			let isSchema = ((ref) instanceof io_colyseus_serializer_schema_Schema);
			let _g = 0;
			while(_g < changes.length) {
				let change = changes[_g];
				++_g;
				if(!isSchema) {
					let container = ref;
					if(change.op == 128 && change.previousValue == null) {
						container.invokeOnAdd(change.value,change.dynamicIndex == null ? change.field : change.dynamicIndex);
					} else if(change.op == 64) {
						if(change.previousValue != null) {
							container.invokeOnRemove(change.previousValue,change.dynamicIndex == null ? change.field : change.dynamicIndex);
						}
					} else if(change.op == 192) {
						if(change.previousValue != null) {
							container.invokeOnRemove(change.previousValue,change.dynamicIndex);
						}
						container.invokeOnAdd(change.value,change.dynamicIndex);
					} else if(change.op == 0 || change.value != change.previousValue) {
						container.invokeOnChange(change.value,change.dynamicIndex);
					}
				}
				if((change.op & 64) == 64 && ((change.previousValue) instanceof io_colyseus_serializer_schema_Schema)) {
					change.previousValue.onRemove();
				}
			}
			if(isSchema) {
				ref.onChange(changes);
			}
		}
	}
	triggerAllFillChanges(ref,allChanges) {
		if(allChanges.exists(ref.__refId)) {
			return;
		}
		let changes = [];
		allChanges.set(ref.__refId,changes);
		if(((ref) instanceof io_colyseus_serializer_schema_Schema)) {
			let _indexes = Reflect.getProperty(ref,"_indexes");
			let map = _indexes;
			let fieldIndex_map = map;
			let fieldIndex_keys = map.keys();
			while(fieldIndex_keys.hasNext()) {
				let key = fieldIndex_keys.next();
				let fieldIndex_value = fieldIndex_map.get(key);
				let fieldIndex_key = key;
				let value = ref.getByIndex(fieldIndex_key);
				changes.push({ field : fieldIndex_value, op : 128, value : value});
				if(js_Boot.__implements(value,io_colyseus_serializer_schema_types_IRef)) {
					this.triggerAllFillChanges(value,allChanges);
				}
			}
		} else {
			let items = Reflect.getProperty(ref,"items");
			let item = items.keyValueIterator();
			while(item.hasNext()) {
				let item1 = item.next();
				changes.push({ field : item1.key, dynamicIndex : item1.key, op : 128, value : item1.value});
				if(js_Boot.__implements(item1,io_colyseus_serializer_schema_types_IRef)) {
					this.triggerAllFillChanges(item1.value,allChanges);
				}
			}
		}
	}
	triggerAll() {
		if(this._refs == null) {
			return;
		}
		let allChanges = new io_colyseus_serializer_schema_types_OrderedMap(new haxe_ds_IntMap());
		this.triggerAllFillChanges(this,allChanges);
		this.triggerChanges(allChanges);
	}
	getSchemaType(bytes,it,defaultType) {
		let type = defaultType;
		if(bytes.b[it.offset] == io_colyseus_serializer_schema_SPEC.TYPE_ID) {
			it.offset++;
			type = this._refs.context.get(io_colyseus_serializer_schema_Schema.decoder.number(bytes,it));
		}
		return type;
	}
	toString() {
		let data = [];
		let field = this._indexes.iterator();
		while(field.hasNext()) {
			let field1 = field.next();
			data.push(field1 + " => " + Std.string(Reflect.getProperty(this,field1)));
		}
		return "{ __refId => " + this.__refId + ", " + data.join(", ") + " }";
	}
}
io_colyseus_serializer_schema_Schema.__name__ = true;
io_colyseus_serializer_schema_Schema.__interfaces__ = [io_colyseus_serializer_schema_types_IRef];
Object.assign(io_colyseus_serializer_schema_Schema.prototype, {
	__class__: io_colyseus_serializer_schema_Schema
});
class io_colyseus_serializer_schema_types_ArraySchema {
	static _new() {
		let this1 = new io_colyseus_serializer_schema_types_ArraySchemaImpl();
		return this1;
	}
	static arrayGet(this1,_key) {
		return this1.getByIndex(_key);
	}
	static arraySet(this1,_key,_value) {
		this1.items.h[_key] = _value;
		return _value;
	}
}
class io_colyseus_serializer_schema_types_OrderedMapIterator {
	constructor(omap) {
		this.index = 0;
		this.map = omap;
	}
	hasNext() {
		return this.index < this.map._keys.length;
	}
	next() {
		return this.map.get(this.map._keys[this.index++]);
	}
}
io_colyseus_serializer_schema_types_OrderedMapIterator.__name__ = true;
Object.assign(io_colyseus_serializer_schema_types_OrderedMapIterator.prototype, {
	__class__: io_colyseus_serializer_schema_types_OrderedMapIterator
});
class io_colyseus_serializer_schema_types_OrderedMap {
	constructor(_map) {
		this.idx = 0;
		this._keys = [];
		this.map = _map;
	}
	set(key,value) {
		if(!this.map.exists(key)) {
			this._keys.push(key);
		}
		this.map.set(key,value);
	}
	toString() {
		let _ret = "";
		let _cnt = 0;
		let _len = this._keys.length;
		let _g = 0;
		let _g1 = this._keys;
		while(_g < _g1.length) {
			let k = _g1[_g];
			++_g;
			_ret += "" + Std.string(k) + " => " + Std.string(this.map.get(k)) + (_cnt++ < _len - 1 ? ", " : "");
		}
		return "{" + _ret + "}";
	}
	clear() {
		this.map.clear();
		this._keys = [];
	}
	iterator() {
		return new io_colyseus_serializer_schema_types_OrderedMapIterator(this);
	}
	keyValueIterator() {
		return this.map.keyValueIterator();
	}
	remove(key) {
		if(this.map.remove(key)) {
			return HxOverrides.remove(this._keys,key);
		} else {
			return false;
		}
	}
	exists(key) {
		return this.map.exists(key);
	}
	get(key) {
		return this.map.get(key);
	}
	keys() {
		return new haxe_iterators_ArrayIterator(this._keys);
	}
}
io_colyseus_serializer_schema_types_OrderedMap.__name__ = true;
Object.assign(io_colyseus_serializer_schema_types_OrderedMap.prototype, {
	__class__: io_colyseus_serializer_schema_types_OrderedMap
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		let intf = cc.__interfaces__;
		if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
			let _g = 0;
			let _g1 = intf.length;
			while(_g < _g1) {
				let i = _g++;
				let i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__,cl);
	}
	static __implements(o,iface) {
		return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
class schema_Avatar extends io_colyseus_serializer_schema_Schema {
	constructor() {
		io_colyseus_serializer_schema_Schema._hx_skip_constructor = true;
		super();
		io_colyseus_serializer_schema_Schema._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.emote = 0;
		this.netState = 0;
		this.state = 0;
		this.skin = 0;
		this.y = 0;
		this.x = 0;
		this.name = "";
		this.id = "";
		super._hx_constructor();
		this._indexes.h[0] = "id";
		this._types.h[0] = "string";
		this._indexes.h[1] = "name";
		this._types.h[1] = "string";
		this._indexes.h[2] = "x";
		this._types.h[2] = "number";
		this._indexes.h[3] = "y";
		this._types.h[3] = "number";
		this._indexes.h[4] = "skin";
		this._types.h[4] = "uint8";
		this._indexes.h[5] = "state";
		this._types.h[5] = "uint8";
		this._indexes.h[6] = "netState";
		this._types.h[6] = "uint8";
		this._indexes.h[7] = "emote";
		this._types.h[7] = "uint8";
	}
}
schema_Avatar.__name__ = true;
schema_Avatar.__super__ = io_colyseus_serializer_schema_Schema;
Object.assign(schema_Avatar.prototype, {
	__class__: schema_Avatar
});
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
NetBits.TOTAL = 8;
NetBits.LG = Math.log(2);
io_colyseus_serializer_schema_CustomType.instance = new io_colyseus_serializer_schema_CustomType();
io_colyseus_serializer_schema_SPEC.SWITCH_TO_STRUCTURE = 255;
io_colyseus_serializer_schema_SPEC.TYPE_ID = 213;
io_colyseus_serializer_schema_Schema._hx_skip_constructor = false;
io_colyseus_serializer_schema_Schema.decoder = new io_colyseus_serializer_schema_Decoder();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=game.js.map